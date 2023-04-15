Imports System
Imports System.Net.Sockets
Imports System.Text

Public Class ChatForm
    Private client As TcpClient
    Private stream As NetworkStream
    Private receiveBuffer As Byte()
    Private chatHistory As New StringBuilder()

    Private Sub ChatForm_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' Connect to the chat server
        client = New TcpClient()
        client.Connect("localhost", 8080)
        stream = client.GetStream()

        ' Start receiving messages asynchronously
        receiveBuffer = New Byte(4095) {}
        stream.BeginRead(receiveBuffer, 0, receiveBuffer.Length, AddressOf OnMessageReceived, Nothing)
    End Sub

    Private Sub OnMessageReceived(ar As IAsyncResult)
        Dim bytesRead As Integer = stream.EndRead(ar)
        Dim message As String = Encoding.ASCII.GetString(receiveBuffer, 0, bytesRead)
        chatHistory.AppendLine(message)
        ' Update UI with received message

        ' Continue receiving messages asynchronously
        stream.BeginRead(receiveBuffer, 0, receiveBuffer.Length, AddressOf OnMessageReceived, Nothing)
    End Sub

    Private Sub SendMessage(message As String)
        Dim messageBytes As Byte() = Encoding.ASCII.GetBytes(message)
        stream.Write(messageBytes, 0, messageBytes.Length)
        stream.Flush()
    End Sub

    Private Sub btnSend_Click(sender As Object, e As EventArgs) Handles btnSend.Click
        Dim message As String = txtMessage.Text.Trim()
        If Not String.IsNullOrEmpty(message) Then
            SendMessage(message)
            txtMessage.Text = String.Empty
            ' Update UI with sent message
        End If
    End Sub

    Private Sub ChatForm_FormClosing(sender As Object, e As FormClosingEventArgs) Handles MyBase.FormClosing
        stream.Close()
        client.Close()
    End Sub
End Class
