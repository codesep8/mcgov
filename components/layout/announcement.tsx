import { Megaphone } from "lucide-react"

export async function Announcement() {
  //공지 10분마다 api불러와서 보여줌
  const notice = null
  if (notice) {
    return (
        <div id="ab-full-width-with-dismiss-button-on-blue-bg" className="hs-removing:-translate-y-full bg-blue-600">
          <div className="max-w-[85rem] px-2 py-2 sm:px-6 lg:px-8 mx-auto">
            <div className="flex">
              <Megaphone size={22} color="#ffffff" />
              &nbsp;
              <p className="text-white">
                  {notice}
              </p>
            </div>
          </div>
      </div>
    )
  } else {
    return null
  }
}