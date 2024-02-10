"use client";

import { useEffect } from "react";
import { themeChange } from "theme-change";

function SwitchTheme() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex text-base-content">
      <div>
        <select
          data-choose-theme
          className="hidden sm:block select select-xs select-ghost sm:text-lg lg:text-md xl:text-lg mb-0 md:mb-3 lg:mb-0 mr-[-2rem] md:mr-0"
        >
          <option disabled>Temas</option>
          <option value="">Padrão</option>
          <option value="light">Claro</option>
          <option value="dark">Escuro</option>
          <option value="sunset">Sunset</option>
          <option value="synthwave">Synth</option>
        </select>
      </div>
    </div>
  );
}

export default SwitchTheme;
