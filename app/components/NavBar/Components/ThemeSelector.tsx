"use client";
import { useEffect} from "react";
import { themeChange } from "theme-change";

function SwitchTheme() {
  useEffect(() => {
    themeChange(false);
  }, []);



  return (
    <div className="flex text-base-content">
      <select
        data-choose-theme
        className="select select-sm select-ghost text-lg"
      >
        <option disabled>Temas</option>
        <option value="">Padrão</option>
        <option value="light">Claro</option>
        <option value="dark">Escuro</option>
        <option value="sunset">Sunset</option>
        <option value="synthwave">Synth</option>
      </select>
    </div>
  );
}

export default SwitchTheme;
