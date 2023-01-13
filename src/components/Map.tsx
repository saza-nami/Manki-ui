import * as ReactLeaflet  from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css';

function Map() {
    return (
        <ReactLeaflet.MapContainer center={[35,138]} zoom={12}> {/* XXX */}
            <ReactLeaflet.TileLayer
                attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
                url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
                maxNativeZoom={18}
                maxZoom={18}
                minNativeZoom={5}
                minZoom={5}
            />
        </ReactLeaflet.MapContainer>
    );
}

export default Map;
