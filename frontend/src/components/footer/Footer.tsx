

const Footer = () => {
  return (
    <div style={{ textAlign: 'center', padding: '10px', fontSize: '14px', color: '#888' }}>
      <hr />
      <div style={{ marginBlock: "20px"}}>
        &copy; {new Date().getFullYear()} - Paul Bekaert
      </div>
    </div>
  );
}

export default Footer;