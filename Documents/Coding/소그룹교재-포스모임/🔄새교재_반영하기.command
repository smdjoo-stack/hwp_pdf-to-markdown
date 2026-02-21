#!/bin/bash
cd "$(dirname "$0")"
python3 scripts/generate_posts.py
echo ""
echo "✅ 업데이트가 완료되었습니다! 창을 닫고 아카이브 페이지를 새로고침 해주세요."
sleep 3
