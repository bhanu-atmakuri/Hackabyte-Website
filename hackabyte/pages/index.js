export default function SimplePage() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#1A1A1E',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <h1>Hackabyte Test Page</h1>
      <p>If you see this, deployment is working!</p>
    </div>
  );
}
