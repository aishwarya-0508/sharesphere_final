import React from 'react';

const PlaceholderImage = ({ 
  category = 'Resources', 
  width = '100%', 
  height = '300px',
  text = ''
}) => {
  const categoryEmojis = {
    'Electronics': '🖥️',
    'Books': '📚',
    'Furniture': '🛋️',
    'Sports': '⚽',
    'Tools': '🔧',
    'Garden': '🌱',
    'Appliances': '🍳',
    'Toys': '🎮',
    'Clothing': '👕',
    'Other': '📦'
  };
  
  const emoji = categoryEmojis[category] || '📦';
  
  return (
    <div
      style={{
        width,
        height,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        overflow: 'hidden',
        color: 'white',
        fontSize: '14px',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        fontSize: '64px',
        marginBottom: '15px'
      }}>
        {emoji}
      </div>
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px'
      }}>
        {category}
      </div>
      
      {text && (
        <div style={{
          position: 'relative',
          zIndex: 1,
          fontSize: '13px',
          opacity: 0.9,
          textAlign: 'center'
        }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default PlaceholderImage;
