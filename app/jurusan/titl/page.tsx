

export default function JurusanDPIB() {
  return (
    <>
      <Navbar />
      <main className="pt-10 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-4">Desain Pemodelan dan Informasi Bangunan (DPIB)</h1>
          <p className="text-center text-gray-600 mb-12">Program Keahlian Desain dan Pemodelan Bangunan</p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Profil Jurusan</h2>
              <p className="text-lg leading-relaxed">
                Jurusan DPIB mempelajari desain, pemodelan, dan pembangunan gedung menggunakan software 
                seperti AutoCAD, Revit, SketchUp, dan teknologi BIM (Building Information Modeling).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Kompetensi Lulusan</h2>
              <ul className="list-disc pl-6 space-y-3 text-lg">
                <li>Ahli Desain dan Gambar Teknik Bangunan</li>
                <li>Operator Software CAD dan BIM</li>
                <li>Perencana dan Estimator Proyek Bangunan</li>
                <li>Siap bekerja di perusahaan konstruksi dan arsitektur</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}