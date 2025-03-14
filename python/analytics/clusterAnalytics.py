from sklearn.cluster import KMeans
import pandas as pd

def calculate_cluster_ldr(data, columns=None, n_clusters=3):
    """
    Fungsi untuk melakukan clustering menggunakan K-Means.

    Parameters:
        data (list): Data input dalam format list of dicts.
        columns (list): Nama kolom yang akan digunakan untuk clustering. Contoh: ["temp", "humid"].
                        Jika None, gunakan semua kolom numerik secara default.
        n_clusters (int): Jumlah cluster yang diinginkan.

    Returns:
        list: Data dengan label cluster dalam format list of dicts.
    """
    try:
        # Konversi data ke DataFrame
        df = pd.DataFrame(data)

        # Jika kolom tidak diberikan, gunakan semua kolom numerik secara default
        if columns is None:
            columns = df.select_dtypes(include=["number"]).columns.tolist()

        # Validasi bahwa semua kolom yang diminta ada dalam data
        if not all(col in df.columns for col in columns):
            raise ValueError(f"Missing required columns: {columns}")

        # Inisialisasi model K-Means
        kmeans = KMeans(n_clusters=n_clusters, random_state=42)

        # Lakukan clustering menggunakan kolom yang ditentukan
        df["cluster"] = kmeans.fit_predict(df[columns])

         # Menambahkan kolom baru untuk nama grup berdasarkan cluster
        group_mapping = {
            0: "Gelap",
            1: "Redup",
            2: "Terang",
            3: "sangat terang",
        }
        
        df["group_name"] = df["cluster"].map(group_mapping)

        # Konversi hasil clustering kembali ke format list of dicts
        result = df.to_dict(orient="records")
        return result
        
    except Exception as e:
        raise ValueError(f"Error in calculate_cluster: {e}")

def calculate_cluster_dht22(data, columns=None, n_clusters=3):
    """
    Fungsi untuk melakukan clustering menggunakan K-Means.

    Parameters:
        data (list): Data input dalam format list of dicts.
        columns (list): Nama kolom yang akan digunakan untuk clustering. Contoh: ["temp", "humid"].
                        Jika None, gunakan semua kolom numerik secara default.
        n_clusters (int): Jumlah cluster yang diinginkan.

    Returns:
        list: Data dengan label cluster dalam format list of dicts.
    """
    try:
        # Konversi data ke DataFrame
        df = pd.DataFrame(data)

        # Jika kolom tidak diberikan, gunakan semua kolom numerik secara default
        if columns is None:
            columns = df.select_dtypes(include=["number"]).columns.tolist()

        # Validasi bahwa semua kolom yang diminta ada dalam data
        if not all(col in df.columns for col in columns):
            raise ValueError(f"Missing required columns: {columns}")

        # Inisialisasi model K-Means
        kmeans = KMeans(n_clusters=n_clusters, random_state=42)

        # Lakukan clustering menggunakan kolom yang ditentukan
        df["cluster"] = kmeans.fit_predict(df[columns])
        
          # Menambahkan kolom baru untuk nama grup berdasarkan cluster
         # Menambahkan kolom baru untuk nama grup berdasarkan cluster
        group_mapping = {
            0: "Suhu rendah, kelembapan tinggi (Lembab dingin)",
            1: "Suhu Sedang, kelembapan sedang (nyaman)",
            2: "Suhu tinggi, kelembapan rendah (panas dan kering)",
        }
        
        df["group_name"] = df["cluster"].map(group_mapping)

        # Konversi hasil clustering kembali ke format list of dicts
        result = df.to_dict(orient="records")
        return result
        
    except Exception as e:
        raise ValueError(f"Error in calculate_cluster: {e}")
def calculate_cluster_ec(data, columns=None, n_clusters=3):
    """
    Fungsi untuk melakukan clustering menggunakan K-Means.

    Parameters:
        data (list): Data input dalam format list of dicts.
        columns (list): Nama kolom yang akan digunakan untuk clustering. Contoh: ["temp", "humid"].
                        Jika None, gunakan semua kolom numerik secara default.
        n_clusters (int): Jumlah cluster yang diinginkan.

    Returns:
        list: Data dengan label cluster dalam format list of dicts.
    """
    try:
        # Konversi data ke DataFrame
        df = pd.DataFrame(data)

        # Jika kolom tidak diberikan, gunakan semua kolom numerik secara default
        if columns is None:
            columns = df.select_dtypes(include=["number"]).columns.tolist()

        # Validasi bahwa semua kolom yang diminta ada dalam data
        if not all(col in df.columns for col in columns):
            raise ValueError(f"Missing required columns: {columns}")

        # Inisialisasi model K-Means
        kmeans = KMeans(n_clusters=n_clusters, random_state=42)

        # Lakukan clustering menggunakan kolom yang ditentukan
        df["cluster"] = kmeans.fit_predict(df[columns])
        
          # Menambahkan kolom baru untuk nama grup berdasarkan cluster
         # Menambahkan kolom baru untuk nama grup berdasarkan cluster
        group_mapping = {
            0: "Air murni (distilasi).",
            1: "Air berkualitas baik.",
            2: "Air dengan kandungan zat terlarut tinggi.",
        }
        
        df["group_name"] = df["cluster"].map(group_mapping)

        # Konversi hasil clustering kembali ke format list of dicts
        result = df.to_dict(orient="records")
        return result
        
    except Exception as e:
        raise ValueError(f"Error in calculate_cluster: {e}")
