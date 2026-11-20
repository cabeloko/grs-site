/** Link "Pular para o conteúdo", visível apenas ao receber foco. */
export function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="fixed top-3 left-3 z-[100] -translate-y-[150%] rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-transform focus-visible:translate-y-0"
    >
      Pular para o conteúdo
    </a>
  );
}
