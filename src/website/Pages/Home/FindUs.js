export default function FindUs(props) {
  return (
    <div className="findus w-100">
      {props.IsImgs === true ? (
        <img src={props.content} alt="img" className="w-100 h-100 img-fluid" />
      ) : (
        <video
          src={require("../../videos/BORZ WEAR (Streetwear Commercial Video) - ICE SQUAD MEDIA.mp4")}
          autoPlay
          loop
          muted
          className="w-100 h-100"
        ></video>
      )}

      <div className="findinfo bg-white p-4">
        <h2>OUR STORES</h2>
        <p>Wait for us soon in El Sheikh Zayed City</p>
        <p>استرييت ويير قريبا فى الشيخ زايد.</p>
        <a href="/" className="btn">
          FIND STORES
        </a>
      </div>
    </div>
  );
}
