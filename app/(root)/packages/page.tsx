import PackagesGrid from "@/components/booking/PackagesGrid";
import Container from "@/components/layout/Container";
import Services from "@/components/sections/Services";
import MotionFade from "@/components/ui/MotionFade";
import React from "react";

const Page = () => {
  return (
    <div>
      <Container>
        <MotionFade>
          <h2 className="mt-10 text-2xl font-bold text-center">Available Packages</h2>
          <PackagesGrid />
          <Services />
        </MotionFade>
      </Container>
    </div>
  );
};

export default Page;
