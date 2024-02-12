import { NextResponse } from "next/server";

export default function noCurrentIntent() {
  console.error("Erro ao criar intenção de pagamento, tente novamente!");
  return NextResponse.json(
    { error: "Erro ao criar intenção de pagamento, tente novamente!" },
    { status: 400 }
  );
}
