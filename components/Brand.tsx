import { site } from "@/lib/site";

export function Brand() {
  return (
    <span className="brand">
      <img className="brand__logo" src="/images/nftci-logo.webp" width={120} height={112} alt="" />
      <span className="brand__copy">
        <span className="brand__name">{site.name}</span>
        <span className="brand__sub">{site.legalName}</span>
      </span>
    </span>
  );
}
