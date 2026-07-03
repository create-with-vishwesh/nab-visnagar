"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Section({ title, description, children }) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Field({ label, id, value, onChange, type = "text", autoComplete }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-900/10"
      />
    </div>
  );
}

function formatDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AccountSettings() {
  const router = useRouter();
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [accountInfo, setAccountInfo] = useState({ role: "", createdAt: "", updatedAt: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function loadAccount() {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/admin/account", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        throw new Error(data?.message || "Unable to load account details.");
      }

      setProfileForm({
        name: data?.data?.name || "",
        email: data?.data?.email || "",
      });
      setAccountInfo({
        role: data?.data?.role || "admin",
        createdAt: data?.data?.createdAt || "",
        updatedAt: data?.data?.updatedAt || "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Unable to load account details.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAccount();
  }, [router]);

  async function handleProfileSubmit(event) {
    event.preventDefault();
    setIsSavingProfile(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/admin/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileForm),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        throw new Error(data?.message || "Unable to save profile.");
      }

      setProfileForm({
        name: data?.data?.name || profileForm.name,
        email: data?.data?.email || profileForm.email,
      });
      setAccountInfo({
        role: data?.data?.role || accountInfo.role,
        createdAt: data?.data?.createdAt || accountInfo.createdAt,
        updatedAt: data?.data?.updatedAt || accountInfo.updatedAt,
      });
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to save profile.");
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    setIsUpdatingPassword(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/admin/account/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordForm),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        throw new Error(data?.message || "Unable to update password.");
      }

      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setSuccessMessage("Password updated successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update password.");
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  return (
    <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Account Settings</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Manage your admin profile</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Update your personal details, change your password, and review the account metadata associated with this admin panel.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
      ) : null}

      {successMessage ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">Loading account details...</div>
      ) : (
        <div className="space-y-6">
          <Section
            title="Profile Information"
            description="Use this section to update your public admin profile details."
          >
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Full Name"
                  id="profile-name"
                  value={profileForm.name}
                  onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))}
                  autoComplete="name"
                />
                <Field
                  label="Email Address"
                  id="profile-email"
                  type="email"
                  value={profileForm.email}
                  onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))}
                  autoComplete="email"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="block text-sm font-medium text-slate-700">Role</label>
                <p className="mt-2 text-sm text-slate-600">{accountInfo.role || "Admin"}</p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isSavingProfile ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          </Section>

          <Section
            title="Change Password"
            description="Update your current password after confirming your existing credentials."
          >
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Current Password"
                  id="current-password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
                  autoComplete="current-password"
                />
                <Field
                  label="New Password"
                  id="new-password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
                  autoComplete="new-password"
                />
              </div>

              <Field
                label="Confirm Password"
                id="confirm-password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                autoComplete="new-password"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isUpdatingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </Section>

          <Section
            title="Account Information"
            description="These details are read-only and are tied to the current admin identity."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="block text-sm font-medium text-slate-700">Role</label>
                <p className="mt-2 text-sm text-slate-600">{accountInfo.role || "Admin"}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="block text-sm font-medium text-slate-700">Account Created Date</label>
                <p className="mt-2 text-sm text-slate-600">{formatDate(accountInfo.createdAt)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Last Updated Date</label>
                <p className="mt-2 text-sm text-slate-600">{formatDate(accountInfo.updatedAt)}</p>
              </div>
            </div>
          </Section>
        </div>
      )}
    </section>
  );
}
