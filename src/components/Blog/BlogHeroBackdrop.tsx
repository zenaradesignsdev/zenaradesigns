// Same backdrop as the service-page heroes, capped in height and faded out so
// long post bodies underneath sit on plain black.
export const BlogHeroBackdrop = () => (
  <div className="absolute inset-x-0 top-0 h-[44rem] max-h-full pointer-events-none" aria-hidden="true">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/45 to-black" />
    <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/35 to-black" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
    <div className="bg-star" style={{ top: '8%', left: '4%' }} />
    <div className="bg-star" style={{ top: '14%', left: '22%' }} />
    <div className="bg-star" style={{ top: '6%', left: '47%' }} />
    <div className="bg-star" style={{ top: '18%', left: '71%' }} />
    <div className="bg-star" style={{ top: '10%', left: '90%' }} />
  </div>
);
