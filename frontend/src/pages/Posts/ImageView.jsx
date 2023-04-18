import React from 'react'

function ImageView(props) {
  const { src, checked, onChange } = props
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', zIndex: 1000, right: 0 }}>
        <input type="checkbox" checked={checked} onChange={onChange} />
      </div>
      <img
        alt=""
        src={src}
        style={{
          width: '6.25rem',
          height: '6.25rem',
          borderRadius: 5,
          objectFit: 'cover',
        }}
      />
    </div>
  )
}

export default ImageView
