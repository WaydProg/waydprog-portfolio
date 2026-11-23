import { BackToTop } from './components/layout/BackToTop';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { About } from './components/sections/About';
import { Contacts } from './components/sections/Contacts';
import { Faq } from './components/sections/Faq';
import { Hero } from './components/sections/Hero';
import { Process } from './components/sections/Process';
import { Services } from './components/sections/Services';
import { Stack } from './components/sections/Stack';
import { Works } from './components/works/Works';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <div id="top">
        <SiteHeader />
      </div>
      <main id="main">
        <Hero />
        <Works />
        <About />
        <Services />
        <Stack />
        <Process />
        <Faq />
        <Contacts />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
