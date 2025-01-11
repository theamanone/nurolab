export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Register for Early Access
          </h1>
          <p className="text-xl text-blue-200">
            We&apos;re working hard to bring you the future of ML learning
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-2">
              Coming Soon
            </div>
            <h2 className="text-2xl font-semibold mb-2">Features in Development</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Interactive ML Tutorials</h3>
              <p className="text-blue-200 text-sm">Step-by-step guides with hands-on coding exercises</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">AI Learning Assistant</h3>
              <p className="text-blue-200 text-sm">Personalized help and feedback as you learn</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Project Templates</h3>
              <p className="text-blue-200 text-sm">Ready-to-use ML project structures and examples</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Community Features</h3>
              <p className="text-blue-200 text-sm">Collaborate and learn with fellow ML enthusiasts</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-blue-200 mb-6">
              Want to learn more about our platform? Contact us at:
            </p>
            <a 
              href="mailto:amankirmara143@gmail.com"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              office.aman@proton.me
            </a>
            <p className="mt-6 text-sm text-blue-300">
              Registration will be enabled once we launch. Stay tuned!
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
