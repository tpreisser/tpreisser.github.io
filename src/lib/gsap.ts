"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let pluginsRegistered = false;

if (!pluginsRegistered) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
  pluginsRegistered = true;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
