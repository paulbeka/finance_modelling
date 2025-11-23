

const Footer = () => {
  return (
    <div style={{ textAlign: 'center', padding: '10px', fontSize: '14px', color: '#888' }}>
      <hr style={{ width: "80%", margin: "1em auto"}} />
      <div style={{ marginBlock: "20px" }}>
        &copy; {new Date().getFullYear()} - Paul Bekaert
      </div>
    </div>
  );
}

export default Footer;