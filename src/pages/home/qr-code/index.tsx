import { QRCode as AQRCode, Button, theme } from 'antd';
const { useToken } = theme;

const QRCode = () => {
  const { token } = useToken();

  const downloadQRCode = () => {
    const canvas = document
      .getElementById('myqrcode')
      ?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  return (
    <div id="myqrcode">
      <AQRCode
        value="https://1069080359.github.io/little-baby/"
        icon={require('./wife.png')}
        color={token.colorSuccessText}
        style={{ marginBottom: 16 }}
        bordered={false}
        size={200}
      />
      <Button type="primary" onClick={downloadQRCode}>
        Download
      </Button>
    </div>
  );
};

export default QRCode;
