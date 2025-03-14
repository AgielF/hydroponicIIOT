import React from 'react'

function ButtonControlling({arguments_btn_1,arguments_btn_2}) {
  return (
    <div>
      <a
  className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
  href="#"
>
  {arguments_btn_1}
</a>

{/* Border */}

<a
  className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
  href="#"
>
  {arguments_btn_2}
</a>
    </div>
  )
}

export default ButtonControlling
