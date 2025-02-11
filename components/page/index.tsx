import { getSession } from "@/lib/session"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

async function IndexWidgets() {
    const session = await getSession();
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">홈페이지</h1>
            <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
                <Card>
                <CardHeader>
                    <CardTitle>최근 소득/소비</CardTitle>
                </CardHeader>
                <CardContent>
                    {session.isLoggedIn ?
                    <div>
                        {session.id}
                    </div>
                    :
                    <p className="text-2xl">로그인하십시오!</p>
                    }
                </CardContent>
                </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
                <Card>
                <CardHeader>
                    <CardTitle>내 정보</CardTitle>
                </CardHeader>
                <CardContent>
                    {session.isLoggedIn ?
                    <div>
                        <p className="text-2xl font-semibold">{session.username}</p>
                        <p className="mt-1 text-xl font-semibold">{session.point}포인트</p>
                    </div>
                    :
                    <p className="text-2xl">로그인하십시오!</p>
                    }
                </CardContent>
                </Card>
            </div>
            </div>
        </div>
    )
}

function IndexWidgetsSkeleton() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">홈페이지</h1>
            <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
                <Card>
                <CardHeader>
                    <CardTitle>최근 소득/소비</CardTitle>
                </CardHeader>
                <CardContent>
                    Loading...
                </CardContent>
                </Card>
            </div>
            <div className="col-span-12 lg:col-span-4">
                <Card>
                <CardHeader>
                    <CardTitle>내 정보</CardTitle>
                </CardHeader>
                <CardContent>
                    Loading...
                </CardContent>
                </Card>
            </div>
            </div>
        </div>
    )
}

export {
    IndexWidgets,
    IndexWidgetsSkeleton
}