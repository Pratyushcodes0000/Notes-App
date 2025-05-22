# Test creating a note
Write-Host "`nTesting POST /api/notes/notes"
$body = @{
    title = "Test Note"
    content = "This is a test note"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:8000/api/notes/notes" -Method Post -Body $body -ContentType "application/json"
$noteId = ($response.Content | ConvertFrom-Json)._id
Write-Host "Response:" $response.Content

# Test getting all notes
Write-Host "`nTesting GET /api/notes/notes"
$response = Invoke-WebRequest -Uri "http://localhost:8000/api/notes/notes" -Method Get
Write-Host "Response:" $response.Content

# Test getting single note
Write-Host "`nTesting GET /api/notes/notes/$noteId"
$response = Invoke-WebRequest -Uri "http://localhost:8000/api/notes/notes/$noteId" -Method Get
Write-Host "Response:" $response.Content

# Test updating note
Write-Host "`nTesting PUT /api/notes/notes/$noteId"
$updateBody = @{
    title = "Updated Test Note"
    content = "This is an updated test note"
} | ConvertTo-Json
$response = Invoke-WebRequest -Uri "http://localhost:8000/api/notes/notes/$noteId" -Method Put -Body $updateBody -ContentType "application/json"
Write-Host "Response:" $response.Content

# Test deleting note
Write-Host "`nTesting DELETE /api/notes/notes/$noteId"
$response = Invoke-WebRequest -Uri "http://localhost:8000/api/notes/notes/$noteId" -Method Delete
Write-Host "Response:" $response.Content 