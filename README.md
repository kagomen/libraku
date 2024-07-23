{/_ 背景画像 _/}
<div className="min-h-screen bg-[url('/hero-img.svg')] bg-140% bg-fixed bg-right-top-custom bg-no-repeat sm:bg-120% md:bg-100% lg:bg-90% xl:bg-80%">
<div className="mx-3 py-10 lg:mx-8">
{/_ 余白調整 _/}
<div className="h-[280px] md:h-[80px] lg:h-[60px]"></div>

          <h2 className="w-fit text-2xl font-semibold text-emerald-500 sm:bg-emerald-500 sm:px-3 sm:py-2 sm:text-3xl sm:text-white lg:px-4 lg:py-3 lg:text-4xl">
            図書館予約カードの記入をラクにする
          </h2>
          <div className="mb-5 mt-2 px-1 sm:mt-4 lg:text-lg">
            <p>図書館でリクエストカードを記入する際に必要な書籍情報を表示します</p>
          </div>

          <div className="md:w-[65%] lg:w-[55%] xl:w-[45%]">
            <SearchBar />

            <div className="mt-10 w-full rounded border border-emerald-500 bg-white bg-opacity-50 p-5 backdrop-blur-sm">
              <h3 className="mb-1 text-lg font-semibold text-emerald-500">ユーザー機能</h3>
              <ul className="list-inside list-disc">
                <li>書籍情報の保存</li>
                <li>図書カードの利用者番号の保存</li>
              </ul>
              <div className="mt-4 space-x-2">
                <Button className="bg-yellow-500">ログイン</Button>
                <Button variant="outline" className="border-orange-600 text-orange-600">
                  新規登録
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
