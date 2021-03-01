const Footer = () => {
  const currentYear: number = new Date().getFullYear()

  return (
    <footer className="w-full p-4 text-left text-gray-300 bg-gray-50">
      <div className="container ml-0 mr-auto">
        <div>
          <a className="hover:text-gray-400" href="https://github.com/dariospace/dariospace.com">
            source
          </a>
        </div>
        <div>unlicensed - {currentYear}</div>
      </div>
    </footer>
  )
}

export default Footer
