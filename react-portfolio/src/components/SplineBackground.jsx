import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Suspense fallback={<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary-color)' }}>Loading 3D Experience...</div>}>
                {/* You can replace this URL with any other Spline design URL */}
                <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
            </Suspense>
            {/* Overlay to ensure text visibility if the 3D scene is too bright */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(15, 20, 25, 0.4), rgba(15, 20, 25, 0.8))', pointerEvents: 'none' }}></div>
        </div>
    );
};

export default SplineBackground;
