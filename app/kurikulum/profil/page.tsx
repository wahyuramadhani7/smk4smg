import Navbar from '../../components/Navbar';

export default function ProfilKurikulum() {
  return (
    <>
      <Navbar />
      <main className="pt-10 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-12">Profil Kurikulum</h1>
          
          <div className="prose max-w-none text-lg">
            <h2 className="text-2xl font-semibold mb-6">Kurikulum Merdeka di SMK 4 SMG</h2>
            <p className="mb-8">
              SMK 4 Semarang menerapkan Kurikulum Merdeka yang dirancang untuk menghasilkan lulusan 
              yang kompeten sesuai kebutuhan industri saat ini.
            </p>

            <h3 className="text-xl font-semibold mt-10 mb-4">Tujuan Pembelajaran Vokasi</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>Mengembangkan kompetensi teknis dan soft skills siswa</li>
              <li>Menyiapkan siswa siap kerja atau melanjutkan pendidikan tinggi</li>
              <li>Membangun karakter disiplin, kreatif, dan inovatif</li>
            </ul>

            <h3 className="text-xl font-semibold mt-10 mb-4">Sistem Pembelajaran</h3>
            <p>Berbasis Proyek Nyata (Project Based Learning) dengan pendekatan industri.</p>

            <div className="mt-10 bg-gray-100 p-8 rounded-xl">
              <p className="font-medium">Link Dokumen Kurikulum:</p>
              <a href="#" className="text-blue-600 underline">Download Kurikulum Merdeka SMK 4 SMG (PDF)</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}