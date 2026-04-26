import { SubmissionManager } from "@/components/admin/SubmissionManager";

export default function MessagesAdminPage() {
  return (
    <SubmissionManager
      title="Contact Form Management"
      description="View, search, filter, delete, and mark contact inquiries as replied."
      endpoint="/api/admin/contact-submissions"
      type="contact"
    />
  );
}
