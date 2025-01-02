import pytest

# テスト用データ
person_id_Group = "1147d50765e7bbf4aa732e3273113c85" # has group id
person_id_nonGroup = "c51ce410c124a10e0db5e4b97fc2af39" # has no group id

class TestPerson:

  def test_get_person_Group(selft, client):
      response = client.get(f"/person/{person_id_Group}")

      assert response.status_code == 200
      assert response.json() == {
          "personInfo": {
            "id": "1147d50765e7bbf4aa732e3273113c85",
            "nickName": "おみおみー",
          },
          "groupMember": [
            {
              "id": "1679091c5a880faf6fb5e6087eb1b2dc",
              "nickName": "武蔵"
            },
            {
              "id": "c81e728d9d4c2f636f067f89cc14862c",
              "nickName": "愛美"
            },
            {
              "id": "c9f0f895fb98ab9159f51fd0297e236d",
              "nickName": "さく"
            }
          ]
      }
  def test_get_person_nonGroup(selft, client):
      response = client.get(f"/person/{person_id_nonGroup}")

      assert response.status_code == 200
      assert response.json() == {
          "person": {
            "id": "c51ce410c124a10e0db5e4b97fc2af39",
            "nickName": "三上",
          },
          "groupMember": []
      }