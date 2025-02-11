"use server"

import { z } from 'zod'
import { usernameTouuid, uuidTousername } from "@/lib/minecraft";
import { createHash } from "crypto";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

//로그인 폼
const signInSchema = z.object({
    username: z.string({
        message: '문자열만 가능합니다.'
      })
      .min(3, { message: '사용자 이름은 최소 3자 이상이어야 합니다.' })
      .max(15, { message: '사용자 이름은 최대 15자까지 가능합니다.' })
      .trim(),
      
    password: z.string({
        message: '문자열만 가능합니다.',
    }).trim()
});

//회원가입 폼
const signUpSchema = z.object({
    username: z.string({
        message: '문자열만 가능합니다.',
      })
      .min(3, { message: '사용자 이름은 최소 3자 이상이어야 합니다.' })
      .max(15, { message: '사용자 이름은 최대 15자까지 가능합니다.' })
      .trim(),
    password: z.string({
        message: '문자열만 가능합니다.',
      })
      .min(8, { message: '비밀번호는 8자 이상이여야 합니다.' })
      .trim(),
    email: z.string().email({ message: '이메일주소가 아닙니다.' }).trim()
});

const depositSchema = z.object({
    target: z.string({
        message: '문자열만 가능합니다.'
      })
      .min(3, { message: '사용자 이름은 최소 3자 이상이어야 합니다.' })
      .max(15, { message: '사용자 이름은 최대 15자까지 가능합니다.' })
      .trim(),
      
    amount: z.number({ message: '숫자만 입력가능합니다.' })
    .int({ message: '정수만 입력가능합니다.' })
    .gte(1, { message: '1부터 입력가능합니다.' })
});

//로그인
export async function signIn(prevState: any, formData: FormData) {

    //폼 검증
    const validatedFields = signInSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    });

    //검증실패 메시지 출력
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    };

    //유저찾기api
    const userdata = await usernameTouuid(validatedFields.data.username);
    if (!userdata) {
        return { message: "해당 마인크래프트닉네임은 존재하지 않습니다. 만약 닉네임을 변경하셨다면 6시간뒤에 다시 시도하십시오." }
    };

    //유저찾기db
    const dbdata = await prisma.users.findUnique({
        where: {
            uuid: userdata.id
        }
    });

    if (!dbdata) {
        return { message: "비밀번호나 닉네임이 일치하지 않습니다." }
    };

    //비번 검증
    //암호화
    const reqpw = validatedFields.data.password;
    const hashedpw = createHash('sha256').update(reqpw).digest('hex');
    //일치여부 확인
    if (dbdata.password == hashedpw) {
        //세션 저장
        const session = await getSession();
        session.id = userdata.id;
        session.username = userdata.name;
        session.point = dbdata.point as number;
        session.isLoggedIn = true;
        //권한확인
        if (dbdata.perm >= 8) {
            session.isAdmin = true;
            console.log(`admin ${dbdata.perm}`)
        } else {
            session.isAdmin = false;
            console.log(`not admin ${dbdata.perm}`)
        }
        //리다이렉트
        await session.save();
        return redirect("/");
    } else {
        //다름
        return { message: "비밀번호나 닉네임이 일치하지 않습니다." };
    }
}

//회원가입
export async function signUp(prevState: any, formData: FormData) {

    //폼 검증
    const validatedFields = signUpSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email')
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    };

    //유저찾기 api
    const userdata = await usernameTouuid(validatedFields.data.username);
    if (!userdata) {
        return { message: "해당 마인크래프트닉네임은 존재하지 않습니다. 만약 닉네임을 변경하셨다면 6시간뒤에 다시 시도하십시오." }
    };

    //유저찾기 db
    const dbdata = await prisma.users.findUnique({
        where: {
            uuid: userdata.id
        }
    });

    if (dbdata) {
        //있으면 로그인창으로
        return redirect('/auth/signin');
    } else {
        //없으면 회원가입 진행
        const reqpw = validatedFields.data.password;
        const hashedpw = createHash('sha256').update(reqpw).digest('hex');
        const initPoint = 10000;
        await prisma.users.create({
            data: {
                uuid: userdata.id,
                email: validatedFields.data.email,
                password: hashedpw,
                point: initPoint,
                perm: 1
            }
        });
        //로그인
        const session = await getSession();
        session.id = userdata.id;
        session.username = userdata.name;
        session.point = initPoint;
        session.isLoggedIn = true;
        session.isAdmin = false;
        await session.save();
        return redirect('/');
    };
}

//로그아웃
export async function signOut() {
    const session = await getSession();
    session.destroy();
    redirect("/");
}

export async function deposit(prevState: any, formData: FormData) {
    const reqamount = Number(formData.get('amount'))
    const validatedFields = depositSchema.safeParse({
        target: formData.get('target'),
        amount: reqamount
    });
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    };
    const targetdata = await usernameTouuid(validatedFields.data.target);
    if (!targetdata) {
        return { message: "해당 마인크래프트닉네임은 존재하지 않습니다." }
    };
    const session = await getSession();
    if (session.id == targetdata.id) {
        return { message: "자신에게 이체할 수 없습니다" }
    }
    const targetdataDB = await prisma.users.findUnique({
        where: {
            uuid: targetdata.id
        }
    });
    if (!targetdataDB) {
        return ({ message: '해당 회원이 존재하지 않습니다.' })
    };
    const userdata = await prisma.users.findUnique({
        where: {
            uuid: session.id
        }
    });
    if (!userdata) {
        return { message: '서버에 에러가 발생했습니다.' }
    };
    if (userdata.point < validatedFields.data.amount) {
        session.point = userdata.point
        await session.save();
        return { message: '잔고가 부족합니다.' };
    };
    const updatedTargetPoint = targetdataDB.point + validatedFields.data.amount;
    const updatedUserPoint = userdata.point - validatedFields.data.amount;
    await prisma.users.update({
        where: {
            uuid: targetdata.id
        },
        data: {
            point: updatedTargetPoint
        }
    });
    await prisma.users.update({
        where: {
            uuid: userdata.uuid
        },
        data: {
            point: updatedUserPoint
        }
    });
    session.point = updatedUserPoint;
    await session.save();
    await prisma.logs.create({
        data: {
            target: targetdata.id,
            target_name: targetdata.name,
            user: userdata.uuid,
            user_name: session.id,
            content: "이체",
            action: "deposit",
            amount: validatedFields.data.amount
        }
    });
    return revalidatePath('/deposit'), { success: true, con: `${targetdata.name}님에게 ${validatedFields.data.amount}만큼 이체했습니다.` }
}