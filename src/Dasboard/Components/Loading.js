export default function Loading() {
  return (
    <div className="Loading-screen vw-100 vh-100 d-flex justify-content-center align-items-center   position-absolute bg-black z-3">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
