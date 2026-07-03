"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function formatDate(dateValue) {
  if (!dateValue) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

export default function ContactMessagesManager() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadMessages() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/contact", {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to load contact messages.");
      }

      setMessages(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load contact messages.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleDelete(messageId) {
    const confirmed = window.confirm("Delete this contact message?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/contact/${messageId}`, {
        method: "DELETE",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete contact message.");
      }

      await loadMessages();
    } catch (error) {
      setErrorMessage(error.message || "Unable to delete contact message.");
    }
  }

  return (
    <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Contact Messages</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Contact inbox</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Review submissions from the public contact form and remove messages when needed.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Sender</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {isLoading ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  Loading messages...
                </td>
              </tr>
            ) : messages.length > 0 ? (
              messages.map((message) => (
                <tr key={message._id} className="align-top">
                  <td className="px-4 py-4 font-medium text-slate-900">{message.name}</td>
                  <td className="px-4 py-4 text-slate-600">{message.email}</td>
                  <td className="px-4 py-4 text-slate-600">{message.category || message.subject || "-"}</td>
                  <td className="px-4 py-4 text-slate-600">{formatDate(message.createdAt)}</td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => handleDelete(message._id)}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={5}>
                  No contact messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}