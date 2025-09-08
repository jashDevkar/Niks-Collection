// app/(auth)/verify-user/page.js
import React, { Suspense } from "react";
import OtpVerificationPage from "./OtpVerificationPage.jsx";
import Spinner from '../../components/Spinner.jsx'

export default function Page() {
  return (
    <Suspense fallback={<Spinner/>}>
      <OtpVerificationPage />
    </Suspense>
  );
}
