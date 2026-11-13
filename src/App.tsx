function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="max-w-lg w-full bg-slate-900 rounded-3xl p-10 text-center border border-slate-800 shadow-2xl">

        <h1 className="text-4xl font-bold text-white mb-4">
          Hello, TypeScript!
        </h1>

        <p className="text-slate-400 text-lg mb-8">
          Welcome to my React + TypeScript + Tailwind CSS v4 project.
        </p>

        <button
          onClick={() => alert('Your project is working!')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition duration-300"
        >
          Get Started
        </button>

      </div>

    </div>
  )
}

export default App