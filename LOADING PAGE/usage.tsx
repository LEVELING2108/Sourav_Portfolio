import { LoaderGlitchText } from "@/components/ui/loader-glitch-text";

export default function Default() {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center bg-background">
      <LoaderGlitchText
        text="LOADING"
        intensity="medium"
        className="text-5xl font-bold tracking-widest text-foreground"
      />
    </div>
  );
}
