/** The Equal Housing Opportunity mark and statement. Required on every page. */
export function EqualHousing() {
  return (
    <div className="flex items-start gap-x-3 text-xs/5 text-ink-soft">
      <svg aria-hidden="true" viewBox="0 0 40 40" className="mt-0.5 size-8 shrink-0 fill-ink">
        <path d="M20 3 2 17h4v18h28V17h4L20 3Zm0 5.2L29 15H11l9-6.8ZM9 18h22v14H9V18Zm3 2v2h16v-2H12Zm0 4v2h16v-2H12Zm0 4v2h16v-2H12Z" />
      </svg>
      <p className="max-w-xs">
        Equal Housing Opportunity. This business supports the Fair Housing Act, the North Carolina State Fair Housing
        Act and the South Carolina Fair Housing Law.
      </p>
    </div>
  )
}
