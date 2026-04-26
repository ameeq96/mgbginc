import { SubmissionManager } from "@/components/admin/SubmissionManager";

export default function BookingsAdminPage() {
  return (
    <SubmissionManager
      title="Consultation Booking Management"
      description="View consultation requests, search/filter submissions, update status, and add internal notes."
      endpoint="/api/admin/consultation-requests"
      type="booking"
    />
  );
}
