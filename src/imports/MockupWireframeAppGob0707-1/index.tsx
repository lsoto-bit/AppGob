import svgPaths from "./svg-0ppwqm9dxt";

function Botones() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Botones">
      <div className="content-stretch flex items-center justify-center max-h-[44px] max-w-[44px] min-h-[44px] min-w-[44px] p-[8px] relative rounded-[50px] shrink-0 size-[44px]" data-name="Icon Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="notifications">
          <div className="absolute inset-[9.38%_16.67%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 19.5">
              <path d={svgPaths.p24b67a00} fill="var(--fill-0, #333333)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center max-h-[44px] max-w-[44px] min-h-[44px] min-w-[44px] p-[8px] relative rounded-[50px] shrink-0 size-[44px]" data-name="Icon Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="person_outline">
          <div className="absolute inset-[16.67%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p1214b600} fill="var(--fill-0, #333333)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 px-[16px] py-[8px] top-0 w-[376px]" data-name="Header">
      <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0" data-name="Logotipos/Demoweb">
        <div className="[word-break:break-word] flex flex-col font-['gobCL:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#333] text-[21px] whitespace-nowrap">
          <p className="leading-[normal]">MiGob</p>
        </div>
      </div>
      <Botones />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#666] text-[11px] tracking-[1.1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Buenos días
        </p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[38px] relative shrink-0 w-[358.002px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto_Slab:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#333] text-[24px] whitespace-nowrap">María Valenzuela</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[79px] relative shrink-0 w-[358.002px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] pt-[20px] relative size-full">
        <Paragraph />
        <Heading />
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Header">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[20px] px-[16px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Contenido() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0 w-full" data-name="Contenido">
      <div aria-hidden className="absolute border border-[#333] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="search">
            <div className="absolute inset-[13.56%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.49 17.49">
                <path d={svgPaths.p3b681e80} fill="var(--fill-0, #333333)" id="Vector" />
              </svg>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px relative text-[#333] text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[1.5]">Buscar en toda la aplicación...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative size-full">
        <div className="relative rounded-[24px] shrink-0 w-[347px]" data-name="Searchbar">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-end justify-center relative size-full">
            <Contenido />
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-[358.002px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#808080] text-[10px] tracking-[1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Mis documentos
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p31b1e680} fill="var(--fill-0, #0F5AC4)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Icono() {
  return (
    <div className="bg-[#f2f2f2] relative rounded-[8px] shrink-0" data-name="Icono">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[8px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[19.5px] relative shrink-0 text-[#333] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Ver mis documentos
        </p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#808080] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          7 documentos disponibles
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-[129.599px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Icono />
        <Container3 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9972 15.9972">
        <g id="Icon">
          <path d={svgPaths.p25c19900} id="Vector" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between p-[16.817px] relative rounded-[16px] shrink-0 w-[358.002px]" data-name="Button">
      <div aria-hidden className="absolute border-[#ccc] border-[0.817px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container2 />
      <Icon1 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[8px] relative size-full">
        <Button />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] pt-[20px] px-[16px] relative size-full">
        <Paragraph1 />
        <ButtonMargin />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="relative shrink-0 w-[358.002px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#808080] text-[10px] tracking-[1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Explorar
        </p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[15.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9972 15.9972">
        <g clipPath="url(#clip0_4006_1609)" id="Icon">
          <path d={svgPaths.p65e3680} id="Vector" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
          <path d={svgPaths.pccf4f80} id="Vector_2" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
          <path d={svgPaths.p1ac44b00} id="Vector_3" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
          <path d="M6.6655 3.9993H9.3317" id="Vector_4" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
          <path d="M6.6655 6.6655H9.3317" id="Vector_5" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
          <path d="M6.6655 9.3317H9.3317" id="Vector_6" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
          <path d="M6.6655 11.9979H9.3317" id="Vector_7" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
        </g>
        <defs>
          <clipPath id="clip0_4006_1609">
            <rect fill="white" height="15.9972" width="15.9972" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icono1() {
  return (
    <div className="bg-[#f2f2f2] relative rounded-[8px] shrink-0" data-name="Icono">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[8px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Lugares de atención
        </p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[13.993px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9927 13.9927">
        <g id="Icon">
          <path d={svgPaths.p37282b80} id="Vector" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.874544" />
        </g>
      </svg>
    </div>
  );
}

function IconAlign() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Icon:align">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-end relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-[356.368px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center overflow-clip px-[16.817px] py-[14.817px] relative rounded-[inherit] size-full">
        <Icono1 />
        <Text />
        <IconAlign />
      </div>
      <div aria-hidden className="absolute border-[#ccc] border-[0.817px] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[15.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9972 15.9972">
        <g id="Icon">
          <path d={svgPaths.p2fbfba00} id="Vector" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
          <path d={svgPaths.p1b285b00} id="Vector_2" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
          <path d={svgPaths.p3726b700} id="Vector_3" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
          <path d={svgPaths.p7295670} id="Vector_4" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
        </g>
      </svg>
    </div>
  );
}

function Icono2() {
  return (
    <div className="bg-[#f2f2f2] relative rounded-[8px] shrink-0" data-name="Icono">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[8px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Servicios
        </p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[13.993px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9927 13.9927">
        <g id="Icon">
          <path d={svgPaths.p37282b80} id="Vector" stroke="var(--stroke-0, #0F5AC4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.874544" />
        </g>
      </svg>
    </div>
  );
}

function IconAlign1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Icon:align">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-end relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-[356.368px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center overflow-clip px-[17px] py-[15px] relative rounded-[inherit] size-full">
        <Icono2 />
        <Text1 />
        <IconAlign1 />
      </div>
      <div aria-hidden className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Container4 />
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] pt-[20px] px-[16px] relative size-full">
        <Paragraph4 />
        <ContainerMargin />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#808080] text-[10px] tracking-[1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Últimas notificaciones
        </p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[15px] relative shrink-0 text-[#1d70b8] text-[10px] text-center tracking-[1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Ver todas
        </p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-[358.002px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Paragraph5 />
        <Button3 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="bg-[#e3f2fd] relative rounded-[4px] shrink-0" data-name="Chips">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[#0d47a1] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Oficial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[275.616px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#333] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Beneficio disponible: Cupón de Gas Licuado
        </p>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[14.989px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[15px] relative shrink-0 text-[#808080] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Según tu perfil, puedes acceder al cupón de gas del mes de julio.
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-[275.616px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container8 />
        <Paragraph6 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[17px] relative shrink-0 w-[49px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[12px] pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#666] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Hace 1h
        </p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-[358.002px]" data-name="Button">
      <div aria-hidden className="absolute border-[#ccc] border-[0.817px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between px-[16.817px] py-[12.817px] relative size-full">
        <Container7 />
        <Text2 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="bg-[#e3f2fd] relative rounded-[4px] shrink-0" data-name="Chips">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[#0d47a1] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Oficial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[275.616px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#333] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Beneficio disponible: Bono Invierno 2026
        </p>
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[14.989px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[15px] relative shrink-0 text-[#808080] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          El Bono Invierno está disponible para tu hogar. Revisa los requisitos.
        </p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-[275.616px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container10 />
        <Paragraph8 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[17px] relative shrink-0 w-[49px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[12px] pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#666] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Hace 3h
        </p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white content-stretch flex items-start justify-between px-[16.817px] py-[12.817px] relative rounded-[16px] shrink-0 w-[358.002px]" data-name="Button">
      <div aria-hidden className="absolute border-[#ccc] border-[0.817px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container9 />
      <Text3 />
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="relative rounded-[16px] shrink-0" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Button5 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="bg-[#e3f2fd] relative rounded-[4px] shrink-0" data-name="Chips">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
            <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[#0d47a1] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Oficial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[292.277px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#333] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Documento por vencer
        </p>
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[14.989px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[15px] relative shrink-0 text-[#808080] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Su cédula vence el 15 de agosto.
        </p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-[292.277px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container12 />
        <Paragraph10 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[17px] relative shrink-0 w-[33px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[12px] pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#666] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Ayer
        </p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white content-stretch flex items-start justify-between px-[16.817px] py-[12.817px] relative rounded-[16px] shrink-0 w-[358.002px]" data-name="Button">
      <div aria-hidden className="absolute border-[#ccc] border-[0.817px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container11 />
      <Text4 />
    </div>
  );
}

function ButtonMargin2() {
  return (
    <div className="relative rounded-[16px] shrink-0" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Button6 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[262.771px] relative shrink-0 w-[358.002px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <Button4 />
        <ButtonMargin1 />
        <ButtonMargin2 />
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] pt-[20px] px-[16px] relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function StickyPlaceholderBottomNav() {
  return <div className="h-[58.665px] relative shrink-0 w-[389.996px]" data-name="Sticky placeholder – BottomNav" />;
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9888 17.9888">
        <g id="Icon">
          <path d={svgPaths.p212ed5c0} id="Vector" stroke="var(--stroke-0, #00268D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d={svgPaths.p13096ff0} id="Vector_2" stroke="var(--stroke-0, #00268D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[11.25px] relative shrink-0 text-[#00268d] text-[9px] text-center tracking-[0.9px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Inicio
        </p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-0 pb-[12px] pt-[13.634px] top-[-0.18px] w-[77.994px]" data-name="Button">
      <div aria-hidden className="absolute border-[#00268d] border-solid border-t-[1.634px] inset-0 pointer-events-none" />
      <Icon6 />
      <Text5 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9888 17.9888">
        <g clipPath="url(#clip0_4006_1545)" id="Icon">
          <path d={svgPaths.pdb01d00} id="Vector" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d={svgPaths.p24035e00} id="Vector_2" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d={svgPaths.p22750e00} id="Vector_3" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d="M7.49533 4.4972H10.4935" id="Vector_4" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d="M7.49533 7.49533H10.4935" id="Vector_5" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d="M7.49533 10.4935H10.4935" id="Vector_6" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d="M7.49533 13.4916H10.4935" id="Vector_7" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
        </g>
        <defs>
          <clipPath id="clip0_4006_1545">
            <rect fill="white" height="17.9888" width="17.9888" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[11.25px] relative shrink-0 text-[#808080] text-[9px] text-center tracking-[0.9px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Lugares
        </p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-[77.99px] py-[12px] top-[0.82px] w-[77.994px]" data-name="Button">
      <Icon7 />
      <Text6 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9888 17.9888">
        <g id="Icon">
          <path d={svgPaths.p36111880} id="Vector" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d={svgPaths.p3ccc5c40} id="Vector_2" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d={svgPaths.p1fb2e700} id="Vector_3" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d={svgPaths.p239c0100} id="Vector_4" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[11.25px] relative shrink-0 text-[#808080] text-[9px] text-center tracking-[0.9px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Servicios
        </p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-[155.99px] py-[12px] top-[0.82px] w-[78.007px]" data-name="Button">
      <Icon8 />
      <Text7 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9888 17.9888">
        <g id="Icon">
          <path d={svgPaths.p37e64cc0} id="Vector" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[11.25px] relative shrink-0 text-[#808080] text-[9px] text-center tracking-[0.9px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Asistencia
        </p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-[234px] py-[12px] top-[0.82px] w-[77.994px]" data-name="Button">
      <Icon9 />
      <Text8 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9888 17.9888">
        <g id="Icon">
          <path d={svgPaths.p3513a280} id="Vector" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
          <path d={svgPaths.p3be44200} id="Vector_2" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1243" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[11.25px] relative shrink-0 text-[#808080] text-[9px] text-center tracking-[0.9px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Mi perfil
        </p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-[311.99px] py-[12px] top-[0.82px] w-[77.994px]" data-name="Button">
      <Icon10 />
      <Text9 />
    </div>
  );
}

function BottomNav() {
  return (
    <div className="absolute bg-white bottom-[0.03px] h-[58.665px] left-0 w-[389.996px]" data-name="BottomNav">
      <div aria-hidden className="absolute border-[#ccc] border-solid border-t-[0.817px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button7 />
        <Button8 />
        <Button9 />
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="bg-white max-w-[390px] relative shrink-0 w-[389.996px]" data-name="HomePage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] relative size-full">
        <div className="bg-white h-[60px] relative shrink-0 w-full" data-name="Header Producto">
          <div aria-hidden className="absolute border-[#e6e6e6] border-b border-solid inset-0 pointer-events-none" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <Header />
            <div className="absolute h-[8px] left-[8px] top-0 w-[110px]" data-name="Logotipos / Franja">
              <div className="absolute inset-[0_0_0_37.27%]" data-name="Fill 10">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69 8">
                  <path clipRule="evenodd" d="M0 8H69V0H0V8Z" fill="var(--fill-0, #FF2930)" fillRule="evenodd" id="Fill 10" />
                </svg>
              </div>
              <div className="absolute inset-[0_62.73%_0_0]" data-name="Fill 11">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 8">
                  <path clipRule="evenodd" d="M0 8H41V0H0V8Z" fill="var(--fill-0, #0F5AC4)" fillRule="evenodd" id="Fill 11" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Header1 />
        <Container1 />
        <Section />
        <Section1 />
        <Section2 />
        <StickyPlaceholderBottomNav />
        <BottomNav />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-white min-h-[852.22900390625px] relative shrink-0 w-full" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center min-h-[inherit] relative size-full">
        <HomePage />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[#fdc700] left-[296px] rounded-[27417100px] size-[15.997px] top-[14px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#101828] text-[9px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          5
        </p>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="h-[965px] relative shrink-0 w-[394px]" data-name="Body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <App />
        <Text10 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[14.989px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9886 14.9886">
        <g clipPath="url(#clip0_4006_1597)" id="Icon">
          <path d="M7.4943 4.9962V2.4981H4.9962" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.936787" />
          <path d={svgPaths.p9c65380} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.936787" />
          <path d="M1.24905 8.74335H2.4981" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.936787" />
          <path d="M12.4905 8.74335H13.7396" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.936787" />
          <path d="M9.36788 8.11882V9.36787" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.936787" />
          <path d="M5.62073 8.11882V9.36787" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.936787" />
        </g>
        <defs>
          <clipPath id="clip0_4006_1597">
            <rect fill="white" height="14.9886" width="14.9886" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[11.25px] relative shrink-0 text-[9px] text-center text-white tracking-[0.9px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Asistente
        </p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[11.25px] relative shrink-0 text-[9px] text-center text-white tracking-[0.9px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          virtual
        </p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="relative shrink-0 w-[46.255px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Text12 />
        <Text13 />
      </div>
    </div>
  );
}

function ButtonAbrirAsistenteVirtual() {
  return (
    <div className="bg-[#0046a8] drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)] relative rounded-[999px] shrink-0 w-full" data-name="Button - Abrir asistente virtual">
      <div aria-hidden className="absolute border-[1.634px] border-solid border-white inset-0 pointer-events-none rounded-[999px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[13.634px] py-[11.634px] relative size-full">
          <Icon11 />
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function FloatingAssistant() {
  return (
    <div className="absolute left-[281.36px] top-[710.48px] w-[96.481px]" data-name="FloatingAssistant">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ButtonAbrirAsistenteVirtual />
      </div>
    </div>
  );
}

export default function MockupWireframeAppGob() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Mockup Wireframe App gob 07/07">
      <Body />
      <FloatingAssistant />
    </div>
  );
}