import { useState, useEffect } from "react";

export default function DashboardAdmin() {
  const [seccion, setSeccion] = useState("equipos");
  const [equipos, setEquipos] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [referidos, setReferidos] = useState<any[]>([]);
  const [contact, setContact] = useState<any>({});
  const [about, setAbout] = useState<any>({});
  const [faq, setFaq] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formEquipo, setFormEquipo] = useState({ nombre: "", año: "", rol: "", logo_url: "" });
  const [formSponsor, setFormSponsor] = useState({ nombre: "", logo_url: "", tipo: "colaborador", link: "" });
  const [formReferido, setFormReferido] = useState({ nombre: "", categoria: "", codigo: "", link: "" });
  const [formContact, setFormContact] = useState({ email: "", discord_link: "", twitter_link: "", instagram_link: "", youtube_link: "", twitch_link: "", kick_link: "", kofi_link: "" });
  const [formAbout, setFormAbout] = useState({ titulo: "", bio: "", años_streameando: "", foto_url: "", objetivo: "" });
  const [formFaq, setFormFaq] = useState({ pregunta: "", respuesta: "", orden: 1 });

  const secciones = [
    { id: "equipos", nombre: "Equipos" },
    { id: "sponsors", nombre: "Sponsors" },
    { id: "referidos", nombre: "Referidos" },
    { id: "contact", nombre: "Contacto" },
    { id: "about", nombre: "Sobre Mí" },
    { id: "faq", nombre: "FAQ" },
  ];

  useEffect(() => {
    if (seccion === "equipos") cargarEquipos();
    if (seccion === "sponsors") cargarSponsors();
    if (seccion === "referidos") cargarReferidos();
    if (seccion === "contact") cargarContact();
    if (seccion === "about") cargarAbout();
    if (seccion === "faq") cargarFaq();
  }, [seccion]);

  // EQUIPOS
  const cargarEquipos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/equipos");
      const data = await res.json();
      setEquipos(data || []);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  const guardarEquipo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEquipo.nombre || !formEquipo.año || !formEquipo.rol) {
      alert("Completa todos los campos");
      return;
    }
    try {
      const res = await fetch("/api/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEquipo),
      });
      if (res.ok) {
        setFormEquipo({ nombre: "", año: "", rol: "", logo_url: "" });
        cargarEquipos();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const eliminarEquipo = async (id: number) => {
    if (!confirm("¿Eliminar este equipo?")) return;
    try {
      await fetch(`/api/equipos/${id}`, { method: "DELETE" });
      cargarEquipos();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // SPONSORS
  const cargarSponsors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sponsors");
      const data = await res.json();
      setSponsors(data || []);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  const guardarSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSponsor.nombre || !formSponsor.tipo) {
      alert("Completa todos los campos");
      return;
    }
    try {
      await fetch("/api/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formSponsor),
      });
      setFormSponsor({ nombre: "", logo_url: "", tipo: "colaborador", link: "" });
      cargarSponsors();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const eliminarSponsor = async (id: number) => {
    if (!confirm("¿Eliminar este sponsor?")) return;
    try {
      await fetch(`/api/sponsors/${id}`, { method: "DELETE" });
      cargarSponsors();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // REFERIDOS
  const cargarReferidos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/referidos");
      const data = await res.json();
      setReferidos(data || []);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  const guardarReferido = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formReferido.nombre || !formReferido.categoria || !formReferido.codigo) {
      alert("Completa todos los campos");
      return;
    }
    try {
      await fetch("/api/referidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formReferido),
      });
      setFormReferido({ nombre: "", categoria: "", codigo: "", link: "" });
      cargarReferidos();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const eliminarReferido = async (id: number) => {
    if (!confirm("¿Eliminar este referido?")) return;
    try {
      await fetch(`/api/referidos/${id}`, { method: "DELETE" });
      cargarReferidos();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // CONTACT
  const cargarContact = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setContact(data);
      setFormContact(data || {});
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  const guardarContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formContact.email) {
      alert("Email es requerido");
      return;
    }
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formContact),
      });
      cargarContact();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // ABOUT
  const cargarAbout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/about");
      const data = await res.json();
      setAbout(data);
      setFormAbout(data || {});
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  const guardarAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAbout.titulo || !formAbout.bio) {
      alert("Completa los campos requeridos");
      return;
    }
    try {
      await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formAbout),
      });
      cargarAbout();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // FAQ
  const cargarFaq = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/faq");
      const data = await res.json();
      setFaq(data || []);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  const guardarFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFaq.pregunta || !formFaq.respuesta) {
      alert("Completa los campos");
      return;
    }
    try {
      await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFaq),
      });
      setFormFaq({ pregunta: "", respuesta: "", orden: 1 });
      cargarFaq();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const eliminarFaq = async (id: number) => {
    if (!confirm("¿Eliminar esta pregunta?")) return;
    try {
      await fetch(`/api/faq/${id}`, { method: "DELETE" });
      cargarFaq();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleLogout = () => {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      window.location.href = "/login";
    });
  };

  const inputStyle = { width: "100%", padding: "10px", border: "1px solid rgba(255,30,60,0.3)", background: "#0a0203", color: "#fff", borderRadius: "6px" };
  const textareaStyle = { ...inputStyle, minHeight: "100px", fontFamily: "monospace" };
  const formContainerStyle = { background: "#1c0709", border: "1px solid rgba(255,30,60,0.2)", borderRadius: "8px", padding: "30px", maxWidth: "800px", marginBottom: "40px" };
  const itemContainerStyle = { background: "#1c0709", border: "1px solid rgba(255,30,60,0.2)", borderRadius: "8px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0203", color: "#fff" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#120406", padding: "30px 20px", borderRight: "1px solid rgba(255,30,60,0.15)", position: "fixed", height: "100vh", overflowY: "auto" }}>
        <h2 style={{ marginBottom: "40px", fontSize: "20px" }}>LMJ<span style={{ color: "#FF1E3C" }}>FPS</span></h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "60px" }}>
          {secciones.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSeccion(sec.id)}
              style={{
                padding: "12px 16px",
                textAlign: "left",
                background: seccion === sec.id ? "rgba(255, 30, 60, 0.15)" : "transparent",
                border: seccion === sec.id ? "1px solid #FF1E3C" : "1px solid transparent",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {sec.nombre}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #FF1E3C 0%, #B00020 100%)", border: "none", color: "#fff", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Cerrar Sesión
        </button>
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, marginLeft: "250px", padding: "40px" }}>
        <h1 style={{ marginBottom: "10px", fontSize: "36px" }}>{secciones.find((s) => s.id === seccion)?.nombre}</h1>
        <p style={{ color: "#9c8a8c", marginBottom: "40px", fontSize: "14px" }}>Edita la información directamente desde acá</p>

        {/* EQUIPOS */}
        {seccion === "equipos" && (
          <div>
            <div style={formContainerStyle}>
              <h3 style={{ marginBottom: "20px" }}>Agregar Equipo</h3>
              <form onSubmit={guardarEquipo} style={{ display: "grid", gap: "20px" }}>
                <input type="text" placeholder="Nombre" value={formEquipo.nombre} onChange={(e) => setFormEquipo({...formEquipo, nombre: e.target.value})} style={inputStyle} />
                <input type="number" placeholder="Año" value={formEquipo.año} onChange={(e) => setFormEquipo({...formEquipo, año: e.target.value || ""})} style={inputStyle} />
                <input type="text" placeholder="Rol" value={formEquipo.rol} onChange={(e) => setFormEquipo({...formEquipo, rol: e.target.value})} style={inputStyle} />
                <input type="url" placeholder="Logo URL" value={formEquipo.logo_url} onChange={(e) => setFormEquipo({...formEquipo, logo_url: e.target.value})} style={inputStyle} />
                <button type="submit" style={{ padding: "12px", background: "linear-gradient(135deg, #FF1E3C 0%, #B00020 100%)", border: "none", color: "#fff", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Guardar</button>
              </form>
            </div>
            <h3 style={{ marginBottom: "20px" }}>Equipos ({equipos.length})</h3>
            <div style={{ display: "grid", gap: "15px" }}>
              {equipos.map((eq) => (
                <div key={eq.id_equipo} style={itemContainerStyle}>
                  <div>
                    <h4>{eq.nombre}</h4>
                    <p style={{ color: "#9c8a8c", fontSize: "14px" }}>{eq.año} · {eq.rol}</p>
                  </div>
                  <button onClick={() => eliminarEquipo(eq.id_equipo)} style={{ padding: "8px 16px", background: "#B00020", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer" }}>Borrar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPONSORS */}
        {seccion === "sponsors" && (
          <div>
            <div style={formContainerStyle}>
              <h3 style={{ marginBottom: "20px" }}>Agregar Sponsor</h3>
              <form onSubmit={guardarSponsor} style={{ display: "grid", gap: "20px" }}>
                <input type="text" placeholder="Nombre" value={formSponsor.nombre} onChange={(e) => setFormSponsor({...formSponsor, nombre: e.target.value})} style={inputStyle} />
                <select value={formSponsor.tipo} onChange={(e) => setFormSponsor({...formSponsor, tipo: e.target.value})} style={inputStyle}>
                  <option value="principal">Principal</option>
                  <option value="colaborador">Colaborador</option>
                </select>
                <input type="url" placeholder="Logo URL" value={formSponsor.logo_url} onChange={(e) => setFormSponsor({...formSponsor, logo_url: e.target.value})} style={inputStyle} />
                <input type="url" placeholder="Link" value={formSponsor.link} onChange={(e) => setFormSponsor({...formSponsor, link: e.target.value})} style={inputStyle} />
                <button type="submit" style={{ padding: "12px", background: "linear-gradient(135deg, #FF1E3C 0%, #B00020 100%)", border: "none", color: "#fff", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Guardar</button>
              </form>
            </div>
            <h3 style={{ marginBottom: "20px" }}>Sponsors ({sponsors.length})</h3>
            <div style={{ display: "grid", gap: "15px" }}>
              {sponsors.map((sp) => (
                <div key={sp.id} style={itemContainerStyle}>
                  <div><h4>{sp.nombre}</h4><p style={{ color: "#9c8a8c", fontSize: "14px" }}>Tipo: {sp.tipo}</p></div>
                  <button onClick={() => eliminarSponsor(sp.id)} style={{ padding: "8px 16px", background: "#B00020", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer" }}>Borrar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REFERIDOS */}
        {seccion === "referidos" && (
          <div>
            <div style={formContainerStyle}>
              <h3 style={{ marginBottom: "20px" }}>Agregar Referido</h3>
              <form onSubmit={guardarReferido} style={{ display: "grid", gap: "20px" }}>
                <input type="text" placeholder="Nombre" value={formReferido.nombre} onChange={(e) => setFormReferido({...formReferido, nombre: e.target.value})} style={inputStyle} />
                <input type="text" placeholder="Categoría" value={formReferido.categoria} onChange={(e) => setFormReferido({...formReferido, categoria: e.target.value})} style={inputStyle} />
                <input type="text" placeholder="Código" value={formReferido.codigo} onChange={(e) => setFormReferido({...formReferido, codigo: e.target.value})} style={inputStyle} />
                <input type="url" placeholder="Link" value={formReferido.link} onChange={(e) => setFormReferido({...formReferido, link: e.target.value})} style={inputStyle} />
                <button type="submit" style={{ padding: "12px", background: "linear-gradient(135deg, #FF1E3C 0%, #B00020 100%)", border: "none", color: "#fff", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Guardar</button>
              </form>
            </div>
            <h3 style={{ marginBottom: "20px" }}>Referidos ({referidos.length})</h3>
            <div style={{ display: "grid", gap: "15px" }}>
              {referidos.map((ref) => (
                <div key={ref.id} style={itemContainerStyle}>
                  <div><h4>{ref.nombre}</h4><p style={{ color: "#9c8a8c", fontSize: "14px" }}>Código: <span style={{ color: "#FF1E3C" }}>{ref.codigo}</span></p></div>
                  <button onClick={() => eliminarReferido(ref.id)} style={{ padding: "8px 16px", background: "#B00020", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer" }}>Borrar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {seccion === "contact" && (
          <div>
            <div style={formContainerStyle}>
              <h3 style={{ marginBottom: "20px" }}>Editar Contacto</h3>
              <form onSubmit={guardarContact} style={{ display: "grid", gap: "20px" }}>
                <input type="email" placeholder="Email" value={formContact.email || ""} onChange={(e) => setFormContact({...formContact, email: e.target.value})} style={inputStyle} required />
                <input type="url" placeholder="Discord Link" value={formContact.discord_link || ""} onChange={(e) => setFormContact({...formContact, discord_link: e.target.value})} style={inputStyle} />
                <input type="url" placeholder="Twitter Link" value={formContact.twitter_link || ""} onChange={(e) => setFormContact({...formContact, twitter_link: e.target.value})} style={inputStyle} />
                <input type="url" placeholder="Instagram Link" value={formContact.instagram_link || ""} onChange={(e) => setFormContact({...formContact, instagram_link: e.target.value})} style={inputStyle} />
                <input type="url" placeholder="YouTube Link" value={formContact.youtube_link || ""} onChange={(e) => setFormContact({...formContact, youtube_link: e.target.value})} style={inputStyle} />
                <input type="url" placeholder="Twitch Link" value={formContact.twitch_link || ""} onChange={(e) => setFormContact({...formContact, twitch_link: e.target.value})} style={inputStyle} />
                <input type="url" placeholder="Kick Link" value={formContact.kick_link || ""} onChange={(e) => setFormContact({...formContact, kick_link: e.target.value})} style={inputStyle} />
                <button type="submit" style={{ padding: "12px", background: "linear-gradient(135deg, #FF1E3C 0%, #B00020 100%)", border: "none", color: "#fff", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Guardar Contacto</button>
              </form>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {seccion === "about" && (
          <div>
            <div style={formContainerStyle}>
              <h3 style={{ marginBottom: "20px" }}>Editar Sobre Mí</h3>
              <form onSubmit={guardarAbout} style={{ display: "grid", gap: "20px" }}>
                <input type="text" placeholder="Título" value={formAbout.titulo || ""} onChange={(e) => setFormAbout({...formAbout, titulo: e.target.value})} style={inputStyle} required />
                <textarea placeholder="Biografía" value={formAbout.bio || ""} onChange={(e) => setFormAbout({...formAbout, bio: e.target.value})} style={textareaStyle} required />
                <input type="number" placeholder="Años streameando" value={formAbout.años_streameando || ""} onChange={(e) => setFormAbout({...formAbout, años_streameando: e.target.value || ""})} style={inputStyle} />
                <input type="url" placeholder="URL de foto" value={formAbout.foto_url || ""} onChange={(e) => setFormAbout({...formAbout, foto_url: e.target.value})} style={inputStyle} />
                <textarea placeholder="Objetivo" value={formAbout.objetivo || ""} onChange={(e) => setFormAbout({...formAbout, objetivo: e.target.value})} style={textareaStyle} />
                <button type="submit" style={{ padding: "12px", background: "linear-gradient(135deg, #FF1E3C 0%, #B00020 100%)", border: "none", color: "#fff", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Guardar Sobre Mí</button>
              </form>
            </div>
          </div>
        )}

        {/* FAQ */}
        {seccion === "faq" && (
          <div>
            <div style={formContainerStyle}>
              <h3 style={{ marginBottom: "20px" }}>Agregar Pregunta</h3>
              <form onSubmit={guardarFaq} style={{ display: "grid", gap: "20px" }}>
                <input type="text" placeholder="Pregunta" value={formFaq.pregunta} onChange={(e) => setFormFaq({...formFaq, pregunta: e.target.value})} style={inputStyle} required />
                <textarea placeholder="Respuesta" value={formFaq.respuesta} onChange={(e) => setFormFaq({...formFaq, respuesta: e.target.value})} style={textareaStyle} required />
                <input type="number" placeholder="Orden" value={formFaq.orden} onChange={(e) => setFormFaq({...formFaq, orden: parseInt(e.target.value) || 1})} style={inputStyle} />
                <button type="submit" style={{ padding: "12px", background: "linear-gradient(135deg, #FF1E3C 0%, #B00020 100%)", border: "none", color: "#fff", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Agregar</button>
              </form>
            </div>
            <h3 style={{ marginBottom: "20px" }}>Preguntas ({faq.length})</h3>
            <div style={{ display: "grid", gap: "15px" }}>
              {faq.map((item) => (
                <div key={item.id} style={itemContainerStyle}>
                  <div><h4>{item.pregunta}</h4><p style={{ color: "#9c8a8c", fontSize: "14px", marginTop: "8px" }}>{item.respuesta.substring(0, 60)}...</p></div>
                  <button onClick={() => eliminarFaq(item.id)} style={{ padding: "8px 16px", background: "#B00020", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer" }}>Borrar</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}