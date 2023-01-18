import * as ReactLeaflet  from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

interface Props {
    mapRef: React.MutableRefObject<L.Map>,
};

function Map({
    mapRef,
}: Props) {
    return (
        <ReactLeaflet.MapContainer center={[35.64143255555,139.74135747222]} zoom={12} ref={mapRef}>
            <ReactLeaflet.TileLayer
                attribution="<a href='https://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>"
                url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
                maxNativeZoom={18}
                maxZoom={21}
                minNativeZoom={5}
                minZoom={5}
            />
        </ReactLeaflet.MapContainer>
    );
}

export default Map;
