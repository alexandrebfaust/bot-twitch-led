import struct

message = [0x31, 0, 0, 0, 0x00, 0x00, 0x0f]

def calculate_checksum(bytes):
        """Calculate the checksum from an array of bytes."""
        return sum(bytes) & 0xFF

def send_bytes(*bytes):
    message_length = len(bytes)
    return struct.pack("B"*message_length, *bytes)

cor = send_bytes(*(message+[calculate_checksum(message)]))[:-1]

checksum = (hex(calculate_checksum(message)))

print(str(cor) + str(checksum))
