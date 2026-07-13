import svgPaths from "./svg-prfewkuwmd";

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center px-[8px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[14.625px] relative shrink-0 text-[9px] text-[rgba(0,0,0,0.6)] text-center tracking-[0.9px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Logotipo
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 size-[95.996px]" data-name="Container">
      <div aria-hidden className="absolute border-[1.634px] border-[rgba(0,0,0,0.4)] border-dashed inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[1.634px] relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto_Slab:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#333] text-[24px] text-center w-[336px]">Te damos la bienvenida a la App ciudadana</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[22px] relative shrink-0 w-[335.238px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#666] text-[12px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          El Estado de Chile en tu bolsillo
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-[335.238px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-col items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-center pb-[40px] pt-[56px] px-[24px] relative size-full">
          <Container />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Icon">
          <path d={svgPaths.p395e7200} fill="var(--fill-0, #0F5AC4)" id="Vector (Stroke)" />
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

function Heading1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto_Slab:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#333] text-[20px] text-center whitespace-nowrap">Documentos digitales</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#808080] text-[12px] text-center w-[320px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Accede a tu cédula de identidad y credencial de discapacidad desde tu celular.
        </p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-[320px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Heading1 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="min-h-[180px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center justify-center min-h-[inherit] px-[32px] py-[24px] relative size-full">
          <Icono />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[12.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9969 12.9969">
        <g id="Icon">
          <path d={svgPaths.p134f3cc0} id="Vector" stroke="var(--stroke-0, #808080)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.812306" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="opacity-30 relative rounded-[27417100px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#ccc] border-[0.817px] border-solid inset-0 pointer-events-none rounded-[27417100px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[16.817px] py-[8.817px] relative size-full">
        <Icon1 />
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[16.5px] relative shrink-0 text-[#808080] text-[11px] text-center tracking-[1.1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Anterior
        </p>
      </div>
    </div>
  );
}

function Button1() {
  return <div className="bg-[#0046a8] relative rounded-[27417100px] shrink-0 size-[7.992px]" data-name="Button" />;
}

function Button2() {
  return <div className="bg-[#ccc] relative rounded-[27417100px] shrink-0 size-[7.992px]" data-name="Button" />;
}

function Button3() {
  return <div className="bg-[#ccc] relative rounded-[27417100px] shrink-0 size-[7.992px]" data-name="Button" />;
}

function Button4() {
  return <div className="bg-[#ccc] relative rounded-[27417100px] shrink-0 size-[7.992px]" data-name="Button" />;
}

function Button5() {
  return <div className="bg-[#ccc] relative rounded-[27417100px] shrink-0 size-[7.992px]" data-name="Button" />;
}

function Button6() {
  return <div className="bg-[#ccc] relative rounded-[27417100px] shrink-0 size-[7.992px]" data-name="Button" />;
}

function Container6() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-start relative size-full">
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[12.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9969 12.9969">
        <g id="Icon">
          <path d={svgPaths.p2fcf8f00} id="Vector" stroke="var(--stroke-0, #0046A8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.812306" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[27417100px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#0046a8] border-[0.817px] border-solid inset-0 pointer-events-none rounded-[27417100px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[16.817px] py-[8.817px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[16.5px] relative shrink-0 text-[#0046a8] text-[11px] text-center tracking-[1.1px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Siguiente
        </p>
        <Icon2 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#ccc] border-solid border-t-[0.817px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pb-[16px] pt-[16.817px] px-[20px] relative size-full">
          <Button />
          <Container6 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container3 />
        <Container5 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] relative size-full">
        <Frame />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[19.5px] relative shrink-0 text-[13px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Iniciar sesión con ClaveÚnica
        </p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[15.997px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9972 15.9972">
        <g id="Icon">
          <path d={svgPaths.p25c19900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999825" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#0046a8] relative rounded-[27417100px] shrink-0 w-[343.231px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[16px] relative size-full">
        <Text1 />
        <Icon3 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[16.25px] relative shrink-0 text-[#808080] text-[10px] text-center w-[344px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Accede de forma segura con tu RUN y ClaveÚnica otorgada por el Registro Civil.
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[20px] py-[24px] relative size-full">
        <Button8 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container:align">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-end relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function WelcomePage() {
  return (
    <div className="bg-white h-[852.229px] max-w-[390px] min-h-[852.22900390625px] relative shrink-0 w-[383.217px]" data-name="WelcomePage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] min-h-[inherit] relative size-full">
        <Header />
        <Container2 />
        <ContainerAlign />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-white h-[852.229px] relative shrink-0 w-[383.217px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
        <WelcomePage />
      </div>
    </div>
  );
}

export default function MockupWireframeAppGob() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Mockup Wireframe App gob 07/07">
      <App />
      <div className="-translate-x-1/2 absolute h-[8px] left-1/2 top-0 w-[110px]" data-name="Logotipos / Franja">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
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
  );
}