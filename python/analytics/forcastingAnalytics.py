from statsmodels.tsa.arima.model import ARIMA
import pandas as pd

def arima_forecast(data, column, order=(1, 1, 1), steps=10):
    """
    Fungsi untuk melakukan forecasting menggunakan ARIMA.

    Parameters:
        data (list): Data input dalam format list of dicts.
        column (str): Nama kolom yang digunakan untuk forecasting.
        order (tuple): Parameter ARIMA (p, d, q). Default adalah (1, 1, 1).
        steps (int): Jumlah langkah (steps) yang ingin diprediksi.

    Returns:
        list: Data dengan hasil prediksi dalam format list of dicts.
    """
    try:
        # Konversi data ke DataFrame
        df = pd.DataFrame(data)

        # Validasi bahwa kolom yang diminta ada dalam data
        if column not in df.columns:
            raise ValueError(f"Missing required column: {column}")

        # Konversi kolom timestamp jika ada
        if "timestamp" in df.columns:
            df["timestamp"] = pd.to_datetime(df["timestamp"])
            df = df.set_index("timestamp").sort_index()

        # Pastikan kolom berupa angka
        if not pd.api.types.is_numeric_dtype(df[column]):
            raise ValueError(f"The column '{column}' must be numeric.")

        # Inisialisasi model ARIMA
        model = ARIMA(df[column], order=order)

        # Fitting model ARIMA
        model_fit = model.fit()

        # Forecasting nilai ke depan
        forecast = model_fit.forecast(steps=steps)

        # Buat DataFrame untuk hasil prediksi
        forecast_df = pd.DataFrame({
            "timestamp": pd.date_range(start=df.index[-1], periods=steps, freq="T"),
            "prediction": forecast
        })

        # Konversi hasil prediksi ke format list of dicts
        result = forecast_df.to_dict(orient="records")

        return result

    except Exception as e:
        raise ValueError(f"Error in arima_forecast: {e}")