import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import SkipLink from "./SkipLink";
import GrainOverlay from "./GrainOverlay";
import AmbientGlow from "./AmbientGlow";
import DemoModeBanner from "./DemoModeBanner";
import { EASINGS, PAGE_TRANSITION_DURATION } from "../../utils/constants";

/**
 * Layout — App-Shell.
 *
 * Routen können über `handle: { noLayout: true }` signalisieren, dass sie
 * ihren eigenen Vollbild-Chrome wollen (z. B. Koch-Modus). Dieses Feature
 * wird in Phase 6 genutzt; aktuell rendern alle Routen mit Shell.
 *
 * Enthält:
 * - Skip-Link (A11y)
 * - Ambient-Glow + Grain-Overlay (Atmosphäre)
 * - Sticky Header + Footer
 * - AnimatePresence für Page-Transitions
 */
export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative min-h-dvh">
      <SkipLink />
      <AmbientGlow />
      <GrainOverlay />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <DemoModeBanner />
        <Header />

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            id="main-content"
            tabIndex={-1}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: PAGE_TRANSITION_DURATION,
              ease: EASINGS.outExpo,
            }}
            className="flex-1 focus:outline-none"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}
