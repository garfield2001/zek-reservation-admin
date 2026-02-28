"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import { Staff } from "@/lib/mock-data";
import { formatDate, authenticatedFetch } from "@/lib/utils";

type ApiUserRole = "ADMIN" | "STAFF";

type ApiUser = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  role: ApiUserRole;
  createdAt: string;
  updatedAt: string;
};

type UserRow = Staff & {
  username: string;
  firstName: string;
  lastName: string;
};

type UserFormState = Partial<UserRow> & {
  password?: string;
};

export default function UsersPage() {
  const router = useRouter();
  const [staffList, setStaffList] = useState<UserRow[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<UserRow | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [formData, setFormData] = useState<UserFormState>({
    name: "",
    email: "",
    role: "Staff",
    phone: "",
    active: true,
    username: "",
    password: "",
  });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const [usersResponse, meResponse] = await Promise.all([
          authenticatedFetch("/api/users", {
            headers: {
              "Content-Type": "application/json",
            },
          }),
          authenticatedFetch("/api/auth/me", {
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (usersResponse.status === 401 || meResponse.status === 401) {
          if (!cancelled) {
            router.push("/login?reason=session_expired");
          }
          return;
        }

        if (!usersResponse.ok) {
          let message = `Failed to load users (${usersResponse.status})`;
          try {
            const data = await usersResponse.json();
            if (data && typeof data.message === "string") {
              message = data.message;
            }
          } catch {}
          console.error(message);
        } else {
          const data = (await usersResponse.json()) as ApiUser[];
          if (!cancelled) {
            const mapped = data.map<UserRow>((user) => ({
              id: String(user.id),
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              role: user.role === "ADMIN" ? "Admin" : "Staff",
              active: true,
              phone: user.phoneNumber ?? "",
              joinedDate: user.createdAt,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
            }));
            setStaffList(mapped);
          }
        }

        if (meResponse.ok) {
          try {
            const me = (await meResponse.json()) as ApiUser;
            if (!cancelled) {
              setCurrentUserId(me.id);
            }
          } catch {}
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (staff?: UserRow) => {
    if (staff) {
      setEditingStaff(staff);
      setFormData({
        ...staff,
        password: "",
      });
    } else {
      setEditingStaff(null);
      setFormData({
        name: "",
        email: "",
        role: "Staff",
        phone: "",
        active: true,
        username: "",
        password: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (currentUserId !== null && Number(id) === currentUserId) {
      alert("You cannot delete your own account while logged in.");
      return;
    }

    if (confirm("Are you sure you want to delete this staff member?")) {
      try {
        const response = await authenticatedFetch(`/api/users/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          let message = `Failed to delete user (${response.status})`;
          try {
            const data = await response.json();
            if (data && typeof data.message === "string") {
              message = data.message;
            }
          } catch {}
          alert(message);
          return;
        }

        setStaffList((prev) => prev.filter((s) => s.id !== id));
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = (formData.name ?? "").trim();
    const username = (formData.username ?? "").trim();
    const email = (formData.email ?? "").trim();
    const phoneNumber = (formData.phone ?? "").trim();
    const password = formData.password ?? "";

    if (!fullName) {
      alert("Full name is required.");
      return;
    }

    if (!username) {
      alert("Username is required.");
      return;
    }

    const nameParts = fullName.split(" ").filter(Boolean);
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : firstName;

    if (!editingStaff && password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (editingStaff && password && password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      const isEditing = Boolean(editingStaff);
      const url = isEditing ? `/api/users/${editingStaff?.id}` : "/api/users";
      const method = isEditing ? "PATCH" : "POST";

      const basePayload = {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        role: (formData.role ?? "Staff") === "Admin" ? "ADMIN" : "STAFF",
      };

      const payload = isEditing
        ? {
            ...basePayload,
            ...(password ? { password } : {}),
          }
        : {
            ...basePayload,
            password,
          };

      const response = await authenticatedFetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data: unknown;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        let message = `Failed to save user (${response.status})`;
        if (
          data &&
          typeof data === "object" &&
          "message" in data &&
          typeof (data as { message?: unknown }).message === "string"
        ) {
          message = (data as { message: string }).message;
        }
        alert(message);
        return;
      }

      const savedUser = data as ApiUser;
      const mappedRow: UserRow = {
        id: String(savedUser.id),
        name: `${savedUser.firstName} ${savedUser.lastName}`,
        email: savedUser.email,
        role: savedUser.role === "ADMIN" ? "Admin" : "Staff",
        active: true,
        phone: savedUser.phoneNumber ?? "",
        joinedDate: savedUser.createdAt,
        username: savedUser.username,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
      };

      if (isEditing && editingStaff) {
        setStaffList((prev) =>
          prev.map((s) => (s.id === editingStaff.id ? mappedRow : s))
        );
      } else {
        setStaffList((prev) => [...prev, mappedRow]);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save user:", error);
      alert("Failed to save user. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">
            Manage administrator and staff accounts.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-zek-red hover:bg-zek-light-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zek-red transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStaff.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold border border-gray-200">
                      {staff.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {staff.name}
                      </div>
                      <div className="text-xs text-gray-500">{staff.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      staff.role === "Admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {staff.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      staff.active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {staff.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(staff.joinedDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(staff)}
                      className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(staff.id)}
                      disabled={
                        currentUserId !== null &&
                        Number(staff.id) === currentUserId
                      }
                      title={
                        currentUserId !== null &&
                        Number(staff.id) === currentUserId
                          ? "You cannot delete your own account"
                          : "Delete user"
                      }
                      className={`p-1 rounded-lg transition-colors ${
                        currentUserId !== null &&
                        Number(staff.id) === currentUserId
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-red-600 hover:text-red-900 hover:bg-red-50"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setIsModalOpen(false)}
            />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {editingStaff ? "Edit Staff" : "Add New Staff"}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form
                  id="staffForm"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                        value={formData.username ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        required={!editingStaff}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                        value={formData.password ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role: e.target.value as "Admin" | "Staff",
                          })
                        }
                      >
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zek-red/20 focus:border-zek-red"
                        value={formData.active ? "active" : "inactive"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            active: e.target.value === "active",
                          })
                        }
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  form="staffForm"
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-zek-red text-base font-medium text-white hover:bg-zek-light-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zek-red sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {editingStaff ? "Save Changes" : "Create Staff"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
