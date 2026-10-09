<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Preserve the uploaded bilingual site with explicit locale layouts and individual leaf routes so inner-page links and metadata remain type-safe.
- Use CollectionView and pure collection helpers for inner-page search, category filtering, sorting, pagination, counts, reset, and empty states so behavior is consistent across collections.
- Use OptionSelect and FormField over the shared UI primitives for form and collection controls so dropdown appearance and accessibility are centralized.
- Import uploaded photos through asset pointers and exclude archived backend bindings so the preview never depends on another project's credentials.
- Keep inquiries frontend-only as validated email drafts until a backend is connected; never display a saved or sent confirmation without real delivery.
- Use one shared header theme toggle with existing semantic light/dark tokens and hydrate browser preferences in an effect so appearance stays consistent without server/browser markup mismatches.
