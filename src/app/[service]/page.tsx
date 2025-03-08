import React from "react";
import ServicePage from "./ServicePage";
import { Suspense } from "react";

type tParams = Promise<{ service: string }>;

export default async function Service(props: { params: tParams }) {
  const { service } = await props.params;

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ServicePage serviceParam={service} />
    </Suspense>
  );
}




