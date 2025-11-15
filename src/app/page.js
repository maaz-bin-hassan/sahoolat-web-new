"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

export default function Page() {
  const [qr, setQr] = useState("");
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  // Generate QR
  useEffect(() => {
    QRCode.toDataURL("https://sahoolat.app/sample-connect", {
      width: 512,
      margin: 2,
    }).then(setQr);
  }, []);

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [];
    const COUNT = Math.max(35, Math.floor((w * h) / 90000));

    function makeParticle() {
      const size = 6 + Math.random() * 20;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.1 - Math.random() * 0.3,
        size,
        alpha: 0.2 + Math.random() * 0.9,
        hue: 160 + Math.random() * 80,
        wobble: Math.random() * 0.015,
        rot: Math.random() * Math.PI * 2,
        type: Math.random() > 0.5 ? "leaf" : "dot",
      };
    }

    for (let i = 0; i < COUNT; i++) particles.push(makeParticle());

    function drawLeaf(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.sin(p.rot) * 0.8);
      const grad = ctx.createLinearGradient(-p.size, 0, p.size, 0);
      grad.addColorStop(0, `hsla(${p.hue},80%,65%,${p.alpha})`);
      grad.addColorStop(1, `hsla(${(p.hue + 90) % 360},80%,70%,${p.alpha * 0.7})`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.7, p.size * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawDot(p) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      g.addColorStop(0, `rgba(255,255,255,${0.4 * p.alpha})`);
      g.addColorStop(0.3, `hsla(${p.hue},90%,70%,${0.18 * p.alpha})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    function loop() {
      ctx.clearRect(0, 0, w, h);

      for (let p of particles) {
        p.x += p.vx + Math.sin(p.x * p.wobble + Date.now() * 0.0008) * 0.25;
        p.y += p.vy;
        p.rot += 0.005;

        if (p.y < -50 || p.x < -200 || p.x > w + 200) {
          p.x = Math.random() * w;
          p.y = h + Math.random() * 60;
        }

        p.type === "leaf" ? drawLeaf(p) : drawDot(p);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    loop();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#f5fbff] to-[#e8f3ff] flex items-center justify-center p-6">

        {/* PARTICLE CANVAS */}
        <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none" />

        {/* HOLOGRAPHIC OVERLAYS */}
        <div className="absolute inset-0 -z-5 pointer-events-none mix-blend-screen">
          <div
              style={{
                background:
                    "radial-gradient(600px 300px at 10% 25%, rgba(140,240,255,0.08), transparent 10%), radial-gradient(500px 260px at 80% 70%, rgba(210,160,255,0.07), transparent 12%)",
                filter: "blur(35px)",
                height: "100%",
                width: "100%",
              }}
          />
          <div
              className="absolute inset-0"
              style={{
                background:
                    "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.06) 55%, rgba(255,255,255,0.02) 100%)",
                animation: "sheen 8s linear infinite",
                mixBlendMode: "overlay",
              }}
          />
          <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "100% 6px",
                mixBlendMode: "overlay",
                opacity: 0.25,
                animation: "scan 6s linear infinite",
              }}
          />
        </div>

        {/* MAIN CARD */}
        <div className="relative z-10 bg-white/40 backdrop-blur-2xl shadow-2xl rounded-3xl p-14 w-full max-w-5xl border border-white/30 animate-fadeIn flex flex-col md:flex-row gap-16">

          {/* LOGO */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-7 py-4 flex items-center border border-gray-200">
            <Image src="/assets/sahoolat.png" alt="logo" width={150} height={40} />
          </div>

          {/* LEFT SIDE */}
          <div className="flex-1 pt-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Connect Your Phone
            </h1>
            <p className="text-gray-700 text-lg mb-8">
              Use the Sahoolat AI app on your phone to scan the QR code and securely log in to Sahoolat Web.
            </p>

            <ol className="list-decimal ml-5 space-y-4 text-gray-800 text-lg">
              <li>Open the Sahoolat AI app on your phone</li>
              <li>Go to Sidebar → <strong>Sahoolat Web</strong></li>
              <li>Tap <strong>“Scan QR Code”</strong></li>
              <li>Point your camera at the QR</li>
            </ol>

            <div className="mt-10 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-ping"></span>
              <span className="text-gray-700 text-lg font-medium">Ready to Connect</span>
            </div>
          </div>

          {/* RIGHT SIDE — QR */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-72 h-72 rounded-2xl shadow-xl border border-white/40 bg-white/70 backdrop-blur-xl overflow-hidden hover:scale-105 transition-transform duration-300 ease-out">
              {!qr ? (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
              ) : (
                  <img src={qr} alt="QR Code" className="absolute inset-0 w-full h-full object-contain p-4" />
              )}

              {/* Holographic overlay */}
              <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                        "linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)",
                    mixBlendMode: "overlay",
                  }}
              />
            </div>
          </div>
        </div>
      </div>
  );
}
